# FreeBirds SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeBirdsFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeBirdsBaseFeature.new
    when "test"
      FreeBirdsTestFeature.new
    else
      FreeBirdsBaseFeature.new
    end
  end
end
