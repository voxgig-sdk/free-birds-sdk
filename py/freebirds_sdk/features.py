# FreeBirds SDK feature factory

from freebirds_sdk.feature.base_feature import FreeBirdsBaseFeature
from freebirds_sdk.feature.test_feature import FreeBirdsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeBirdsBaseFeature(),
        "test": lambda: FreeBirdsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
