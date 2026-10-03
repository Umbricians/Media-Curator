#!/usr/bin/env python3
"""Builds the embedded TGM genre/format scheme from the Library of Congress bulk download.

Source: Thesaurus for Graphic Materials (TGM), Library of Congress, MADS/RDF N-Triples bulk export
  https://id.loc.gov/download/vocabulary/graphicMaterials.madsrdf.nt.gz
  (listed at https://id.loc.gov/download/ ; vocabulary at https://id.loc.gov/vocabulary/graphicMaterials)
TGM is a work of the United States government and is in the public domain in the United States.

Usage (Python 3.9+, standard library only):
  python3 tools/schemes/build_tgm_genre_format.py [input.nt.gz|URL] [output.txt]
Defaults: downloads the URL above and writes
  src/Umbricians.MediaCurator/Schemes/Resources/tgm-genre-format.txt

Selection: an authority is a genre/format term when its record says
"Applied within MARC as: Genre/Format (MARC 155/655)" (TGM terms can be both subject and genre/format
terms; those count too). Only broader links between two genre/format terms are kept.

Parent rule (TGM is polyhierarchical; the scheme format needs one parent per code):
  1. Terms without a genre/format broader term are top terms.
  2. Every other term's depth is its shortest path, through genre/format broader links, to a top term.
  3. The parent is the broader term with the smallest depth; ties go to the alphabetically first label
     (case-insensitive), then the lowest TGM identifier.
A parent is therefore always strictly shallower than its child, so the result can never contain a
cycle. Terms that cannot reach a top term (a broader-link cycle with no way out) become top terms
themselves; the script reports them.
"""

import datetime
import gzip
import io
import re
import sys
import urllib.request
from collections import deque
from pathlib import Path

SOURCE_URL = "https://id.loc.gov/download/vocabulary/graphicMaterials.madsrdf.nt.gz"
REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_OUTPUT = REPO_ROOT / "src/Umbricians.MediaCurator/Schemes/Resources/tgm-genre-format.txt"

TERM = re.compile(r"^<http://id\.loc\.gov/vocabulary/graphicMaterials/(tgm\d+)> <([^>]+)> (.+) \.$")
MADS = "http://www.loc.gov/mads/rdf/v1#"
GENRE_NOTE = "Applied within MARC as: Genre/Format (MARC 155/655)"
LITERAL = re.compile(r'^"((?:[^"\\]|\\.)*)"(?:@[\w-]+|\^\^<[^>]+>)?$')
OBJECT_TERM = re.compile(r"^<http://id\.loc\.gov/vocabulary/graphicMaterials/(tgm\d+)>$")


def unescape(value):
    return re.sub(
        r"\\(u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8}|.)",
        lambda m: chr(int(m.group(1)[1:], 16)) if m.group(1)[0] in "uU" else
        {"t": "\t", "n": "\n", "r": "\r"}.get(m.group(1), m.group(1)),
        value)


def open_source(source):
    if source.startswith("http://") or source.startswith("https://"):
        with urllib.request.urlopen(source, timeout=300) as response:
            data = response.read()
    else:
        data = Path(source).read_bytes()
    if data[:2] == b"\x1f\x8b":
        data = gzip.decompress(data)
    return io.StringIO(data.decode("utf-8"))


def parse(lines):
    labels, genre, authorities, broader = {}, set(), set(), {}
    for line in lines:
        match = TERM.match(line.strip())
        if not match:
            continue
        code, predicate, obj = match.groups()
        if predicate == MADS + "authoritativeLabel":
            literal = LITERAL.match(obj)
            if literal:
                labels[code] = unescape(literal.group(1)).strip()
        elif predicate == MADS + "exampleNote":
            literal = LITERAL.match(obj)
            if literal and GENRE_NOTE in unescape(literal.group(1)):
                genre.add(code)
        elif predicate == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" and obj == "<" + MADS + "Authority>":
            authorities.add(code)
        elif predicate == MADS + "hasBroaderAuthority":
            target = OBJECT_TERM.match(obj)
            if target:
                broader.setdefault(code, set()).add(target.group(1))
    return labels, genre, authorities, broader


def build(labels, genre, authorities, broader):
    terms = {code for code in genre if code in authorities and labels.get(code)}
    parents = {code: sorted(b for b in broader.get(code, ()) if b in terms and b != code) for code in terms}
    children = {code: [] for code in terms}
    for code, candidates in parents.items():
        for parent in candidates:
            children[parent].append(code)

    roots = sorted(code for code in terms if not parents[code])
    depth = {code: 0 for code in roots}
    queue = deque(roots)
    while queue:
        code = queue.popleft()
        for child in children[code]:
            if child not in depth:
                depth[child] = depth[code] + 1
                queue.append(child)

    unreachable = sorted(code for code in terms if code not in depth)
    for code in unreachable:
        depth[code] = 0

    def sort_key(code):
        return (depth[code], labels[code].casefold(), code)

    chosen = {}
    for code in terms:
        candidates = [p for p in parents[code] if depth[p] < depth[code]]
        chosen[code] = min(candidates, key=sort_key) if candidates else None
    return terms, chosen, depth, unreachable


def main():
    source = sys.argv[1] if len(sys.argv) > 1 else SOURCE_URL
    output = Path(sys.argv[2]) if len(sys.argv) > 2 else DEFAULT_OUTPUT
    labels, genre, authorities, broader = parse(open_source(source))
    terms, chosen, depth, unreachable = build(labels, genre, authorities, broader)

    header = [
        "# Library of Congress Thesaurus for Graphic Materials (TGM) — genre/format terms.",
        "# Source: " + SOURCE_URL + " (retrieved " + datetime.date.today().isoformat() + ")",
        "# TGM is a work of the United States government and is in the public domain in the United States.",
        "# Generated by tools/schemes/build_tgm_genre_format.py — do not edit by hand; re-run the script.",
        "# Codes are TGM identifiers. TGM is polyhierarchical: each term's parent is the genre/format broader",
        "# term closest to a top term (ties: alphabetical label, then identifier), so there are no cycles.",
        "# Format: code|name|parentCode",
    ]
    rows = sorted(terms, key=lambda c: (labels[c].casefold(), c))
    lines = header + [
        "{}|{}|{}".format(code, labels[code].replace("|", "/"), chosen[code] or "") for code in rows
    ]
    output.write_text("\n".join(lines) + "\n", encoding="utf-8")

    roots = sum(1 for c in terms if chosen[c] is None)
    print("{} genre/format terms, {} top terms, max depth {}, written to {}".format(
        len(terms), roots, max(depth.values(), default=0) + 1, output))
    if unreachable:
        print("Terms in broader-link cycles, made top terms: " + ", ".join(unreachable))


if __name__ == "__main__":
    main()
