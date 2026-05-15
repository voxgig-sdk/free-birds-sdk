# FreeBirds SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreeBirdsUtility.registrar = ->(u) {
  u.clean = FreeBirdsUtilities::Clean
  u.done = FreeBirdsUtilities::Done
  u.make_error = FreeBirdsUtilities::MakeError
  u.feature_add = FreeBirdsUtilities::FeatureAdd
  u.feature_hook = FreeBirdsUtilities::FeatureHook
  u.feature_init = FreeBirdsUtilities::FeatureInit
  u.fetcher = FreeBirdsUtilities::Fetcher
  u.make_fetch_def = FreeBirdsUtilities::MakeFetchDef
  u.make_context = FreeBirdsUtilities::MakeContext
  u.make_options = FreeBirdsUtilities::MakeOptions
  u.make_request = FreeBirdsUtilities::MakeRequest
  u.make_response = FreeBirdsUtilities::MakeResponse
  u.make_result = FreeBirdsUtilities::MakeResult
  u.make_point = FreeBirdsUtilities::MakePoint
  u.make_spec = FreeBirdsUtilities::MakeSpec
  u.make_url = FreeBirdsUtilities::MakeUrl
  u.param = FreeBirdsUtilities::Param
  u.prepare_auth = FreeBirdsUtilities::PrepareAuth
  u.prepare_body = FreeBirdsUtilities::PrepareBody
  u.prepare_headers = FreeBirdsUtilities::PrepareHeaders
  u.prepare_method = FreeBirdsUtilities::PrepareMethod
  u.prepare_params = FreeBirdsUtilities::PrepareParams
  u.prepare_path = FreeBirdsUtilities::PreparePath
  u.prepare_query = FreeBirdsUtilities::PrepareQuery
  u.result_basic = FreeBirdsUtilities::ResultBasic
  u.result_body = FreeBirdsUtilities::ResultBody
  u.result_headers = FreeBirdsUtilities::ResultHeaders
  u.transform_request = FreeBirdsUtilities::TransformRequest
  u.transform_response = FreeBirdsUtilities::TransformResponse
}
