require 'rails_helper'

RSpec.describe Redemption, type: :model do
  let(:redemption) { create(:redemption) }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(redemption).to be_valid
    end

    it 'is not valid without a user' do
      redemption.user = nil

      expect(redemption).not_to be_valid
      expect(redemption.errors[:user_id]).to include("can't be blank")
    end

    it 'is not valid without a reward' do
      redemption.reward = nil

      expect(redemption).not_to be_valid
      expect(redemption.errors[:reward_id]).to include("can't be blank")
    end
  end
end
