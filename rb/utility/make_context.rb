# FreeBirds SDK utility: make_context
require_relative '../core/context'
module FreeBirdsUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreeBirdsContext.new(ctxmap, basectx)
  }
end
