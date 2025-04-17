json.extract! redemption, :id, :user_id, :reward_id, :redeemed_at, :created_at, :updated_at

json.reward do
  json.extract! redemption.reward, :id, :name, :description, :points_cost, :available
end
