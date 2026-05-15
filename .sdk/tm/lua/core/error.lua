-- FreeBirds SDK error

local FreeBirdsError = {}
FreeBirdsError.__index = FreeBirdsError


function FreeBirdsError.new(code, msg, ctx)
  local self = setmetatable({}, FreeBirdsError)
  self.is_sdk_error = true
  self.sdk = "FreeBirds"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreeBirdsError:error()
  return self.msg
end


function FreeBirdsError:__tostring()
  return self.msg
end


return FreeBirdsError
