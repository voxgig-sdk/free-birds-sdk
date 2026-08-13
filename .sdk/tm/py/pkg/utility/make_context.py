# FreeBirds SDK utility: make_context

from projectname_sdk.core.context import FreeBirdsContext


def make_context_util(ctxmap, basectx):
    return FreeBirdsContext(ctxmap, basectx)
