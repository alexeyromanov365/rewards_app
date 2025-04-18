class RedemptionService
  def initialize(user, reward)
    @user = user
    @reward = reward
    @validator = RedemptionValidator.new(user, reward)
    @points_updater = UserPointsUpdater.new(user, reward.points_cost)
  end

  def create_redemption
    validate_record
    create_record
  rescue ActiveRecord::RecordInvalid => e
    raise ValidationError, e.message
  end

  private

  attr_reader :user, :reward, :validator, :points_updater

  def validate_record
    validator.validate!
  end

  def create_record
    Redemption.transaction do
      redemption = Redemption.create!(user: user, reward: reward, redeemed_at: Time.current)

      points_updater.update!

      redemption
    end
  end

  class ValidationError < StandardError; end
end
