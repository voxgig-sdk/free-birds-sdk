# FreeBirds SDK utility: feature_add
module FreeBirdsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
