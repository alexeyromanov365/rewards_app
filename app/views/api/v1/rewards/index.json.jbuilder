json.array! @rewards do |reward|
  json.partial! "api/v1/rewards/reward", reward: reward
end
