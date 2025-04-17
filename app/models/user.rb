class User < ApplicationRecord
  has_many :redemptions
  has_many :rewards, through: :redemptions

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :points, numericality: { greater_than_or_equal_to: 0 }
end
