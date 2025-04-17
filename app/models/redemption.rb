class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward
  
  validates :redeemed_at, presence: true
  
  before_validation :set_redeemed_at, on: :create
  after_create :deduct_points
  
  private
  
  def set_redeemed_at
    self.redeemed_at ||= Time.current
  end
  
  def deduct_points
    user.update(points: user.points - reward.points_cost)
  end
end
