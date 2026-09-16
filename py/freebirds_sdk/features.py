# FreeBirds SDK feature factory

from freebirds_sdk.feature.base_feature import FreeBirdsBaseFeature
from freebirds_sdk.feature.ratelimit_feature import FreeBirdsRatelimitFeature
from freebirds_sdk.feature.retry_feature import FreeBirdsRetryFeature
from freebirds_sdk.feature.test_feature import FreeBirdsTestFeature
from freebirds_sdk.feature.timeout_feature import FreeBirdsTimeoutFeature


_FEATURES = {
    "base": lambda: FreeBirdsBaseFeature(),
    "ratelimit": lambda: FreeBirdsRatelimitFeature(),
    "retry": lambda: FreeBirdsRetryFeature(),
    "test": lambda: FreeBirdsTestFeature(),
    "timeout": lambda: FreeBirdsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
