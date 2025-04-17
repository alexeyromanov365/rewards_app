FactoryBot.define do
  factory :reward do
    sequence(:name) { |n| "Reward #{n}" }
    description { Faker::Lorem.sentence }
    points_cost { rand(100..1000) }
    available { true }
  end
end
