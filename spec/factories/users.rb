FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    points { 1000 }
  end
end
