json.array! @redemptions do |redemption|
  json.partial! "api/v1/redemptions/redemption", redemption: redemption
end
