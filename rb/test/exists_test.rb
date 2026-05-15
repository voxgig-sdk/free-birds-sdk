# FreeBirds SDK exists test

require "minitest/autorun"
require_relative "../FreeBirds_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeBirdsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
