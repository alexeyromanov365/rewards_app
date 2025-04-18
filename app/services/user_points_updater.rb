class UserPointsUpdater
  def initialize(user, points_to_deduct)
    @user = user
    @points_to_deduct = points_to_deduct
  end

  def update!
    user.update!(points: user.points - points_to_deduct)
  end

  private

  attr_reader :user, :points_to_deduct
end
