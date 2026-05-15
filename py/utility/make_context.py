# FreeBirds SDK utility: make_context

from core.context import FreeBirdsContext


def make_context_util(ctxmap, basectx):
    return FreeBirdsContext(ctxmap, basectx)
