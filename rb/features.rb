# FreeBirds SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeBirdsFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeBirdsBaseFeature.new
    when "ratelimit"
      FreeBirdsRatelimitFeature.new
    when "retry"
      FreeBirdsRetryFeature.new
    when "test"
      FreeBirdsTestFeature.new
    when "timeout"
      FreeBirdsTimeoutFeature.new
    else
      FreeBirdsBaseFeature.new
    end
  end
end
