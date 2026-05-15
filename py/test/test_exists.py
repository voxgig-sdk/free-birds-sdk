# ProjectName SDK exists test

import pytest
from freebirds_sdk import FreeBirdsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeBirdsSDK.test(None, None)
        assert testsdk is not None
