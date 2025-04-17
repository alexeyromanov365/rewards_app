# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create users
users = [
  { name: 'John Smith', email: 'john@example.com', points: 5000 },
  { name: 'Jane Doe', email: 'jane@example.com', points: 2500 },
  { name: 'Bob Johnson', email: 'bob@example.com', points: 7500 }
]

users.each do |user_data|
  User.create!(user_data)
end

# Create rewards
rewards = [
  { name: '$5 Coffee Gift Card', description: 'Redeem for a $5 gift card at your favorite coffee shop', points_cost: 500, available: true },
  { name: '$10 Amazon Gift Card', description: 'Redeem for a $10 Amazon gift card', points_cost: 1000, available: true },
  { name: '$25 Restaurant Voucher', description: 'Redeem for a $25 voucher at select restaurants', points_cost: 2500, available: true },
  { name: '$50 Shopping Voucher', description: 'Redeem for a $50 shopping voucher at select retailers', points_cost: 5000, available: true },
  { name: 'Premium Subscription - 1 Month', description: 'One month of premium subscription', points_cost: 1500, available: true },
  { name: 'Limited Edition T-shirt', description: 'Exclusive t-shirt design only available through rewards program', points_cost: 3000, available: true },
  { name: 'VIP Event Access', description: 'VIP access to upcoming special events', points_cost: 7500, available: false }
]

rewards.each do |reward_data|
  Reward.create!(reward_data)
end

# Create some redemption history
Redemption.create!(
  user: User.find_by(email: 'john@example.com'),
  reward: Reward.find_by(name: '$5 Coffee Gift Card'),
  redeemed_at: 10.days.ago
)

Redemption.create!(
  user: User.find_by(email: 'jane@example.com'),
  reward: Reward.find_by(name: '$10 Amazon Gift Card'),
  redeemed_at: 5.days.ago
)

Redemption.create!(
  user: User.find_by(email: 'john@example.com'),
  reward: Reward.find_by(name: 'Premium Subscription - 1 Month'),
  redeemed_at: 2.days.ago
)

puts "Seed data created successfully!"
