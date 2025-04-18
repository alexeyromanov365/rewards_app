class RedemptionValidator
  def initialize(user, reward)
    @user = user
    @reward = reward
  end

  def validate!
    validate_reward_availability!
    validate_user_points!
  end

  private

  attr_reader :user, :reward

  def validate_reward_availability!
    raise ValidationError, "Reward not available" unless reward.available
  end

  def validate_user_points!
    raise ValidationError, "Insufficient points" if user.points < reward.points_cost
  end

  class ValidationError < StandardError; end
end 
