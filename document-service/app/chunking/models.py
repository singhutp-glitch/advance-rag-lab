from dataclasses import dataclass
from typing import List
from enum import Enum


@dataclass
class Chunk:
    chunk_index: int
    markdown: str
    pages: List[int]
    section_heading: str
    type: ChunkType


class ChunkType(Enum):
    PARAGRAPH = "paragraph"
    TABLE = "table"
    LIST = "list"
    FIGURE = "figure"
    CAPTION = "caption"



@dataclass
class DocumentElement:
    element_index: int
    type: str
    markdown: str
    pages: List[int]


@dataclass
class NormalizedDocument:
    elements: List[DocumentElement]