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
  { name: 'Coffee Voucher', description: 'Redeem for a coffee voucher at participating locations', points_cost: 500, available: true },
  { name: 'Shopping Voucher - Small', description: 'Redeem for a small shopping voucher at participating stores', points_cost: 1000, available: true },
  { name: 'Dining Voucher', description: 'Redeem for a dining voucher at participating restaurants', points_cost: 2500, available: true },
  { name: 'Shopping Voucher - Large', description: 'Redeem for a large shopping voucher at participating stores', points_cost: 5000, available: true },
  { name: 'Premium Service - 1 Month', description: 'One month of premium service access', points_cost: 1500, available: true },
  { name: 'Exclusive Merchandise', description: 'Limited edition merchandise only available through rewards program', points_cost: 3000, available: true },
  { name: 'Special Event Access', description: 'Access to upcoming special events', points_cost: 7500, available: false }
]

rewards.each do |reward_data|
  Reward.create!(reward_data)
end

# Create some redemption history
Redemption.create!(
  user: User.find_by(email: 'john@example.com'),
  reward: Reward.find_by(name: 'Coffee Voucher'),
  redeemed_at: 10.days.ago
)

Redemption.create!(
  user: User.find_by(email: 'jane@example.com'),
  reward: Reward.find_by(name: 'Shopping Voucher - Small'),
  redeemed_at: 5.days.ago
)

Redemption.create!(
  user: User.find_by(email: 'john@example.com'),
  reward: Reward.find_by(name: 'Premium Service - 1 Month'),
  redeemed_at: 2.days.ago
)

puts "Seed data created successfully!"
