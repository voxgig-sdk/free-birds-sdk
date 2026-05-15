<?php
declare(strict_types=1);

// FreeBirds SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FreeBirdsUtility::setRegistrar(function (FreeBirdsUtility $u): void {
    $u->clean = [FreeBirdsClean::class, 'call'];
    $u->done = [FreeBirdsDone::class, 'call'];
    $u->make_error = [FreeBirdsMakeError::class, 'call'];
    $u->feature_add = [FreeBirdsFeatureAdd::class, 'call'];
    $u->feature_hook = [FreeBirdsFeatureHook::class, 'call'];
    $u->feature_init = [FreeBirdsFeatureInit::class, 'call'];
    $u->fetcher = [FreeBirdsFetcher::class, 'call'];
    $u->make_fetch_def = [FreeBirdsMakeFetchDef::class, 'call'];
    $u->make_context = [FreeBirdsMakeContext::class, 'call'];
    $u->make_options = [FreeBirdsMakeOptions::class, 'call'];
    $u->make_request = [FreeBirdsMakeRequest::class, 'call'];
    $u->make_response = [FreeBirdsMakeResponse::class, 'call'];
    $u->make_result = [FreeBirdsMakeResult::class, 'call'];
    $u->make_point = [FreeBirdsMakePoint::class, 'call'];
    $u->make_spec = [FreeBirdsMakeSpec::class, 'call'];
    $u->make_url = [FreeBirdsMakeUrl::class, 'call'];
    $u->param = [FreeBirdsParam::class, 'call'];
    $u->prepare_auth = [FreeBirdsPrepareAuth::class, 'call'];
    $u->prepare_body = [FreeBirdsPrepareBody::class, 'call'];
    $u->prepare_headers = [FreeBirdsPrepareHeaders::class, 'call'];
    $u->prepare_method = [FreeBirdsPrepareMethod::class, 'call'];
    $u->prepare_params = [FreeBirdsPrepareParams::class, 'call'];
    $u->prepare_path = [FreeBirdsPreparePath::class, 'call'];
    $u->prepare_query = [FreeBirdsPrepareQuery::class, 'call'];
    $u->result_basic = [FreeBirdsResultBasic::class, 'call'];
    $u->result_body = [FreeBirdsResultBody::class, 'call'];
    $u->result_headers = [FreeBirdsResultHeaders::class, 'call'];
    $u->transform_request = [FreeBirdsTransformRequest::class, 'call'];
    $u->transform_response = [FreeBirdsTransformResponse::class, 'call'];
});
