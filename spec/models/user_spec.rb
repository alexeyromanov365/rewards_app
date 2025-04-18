require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }
  let!(:existing_user) { create(:user, email: 'test@example.com') }

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(user).to be_valid
    end

    it 'is not valid without a name' do
      user.name = nil

      expect(user).not_to be_valid
      expect(user.errors[:name]).to include("can't be blank")
    end

    it 'is not valid without an email' do
      user.email = nil

      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'is not valid with an invalid email format' do
      user.email = 'invalid-email'

      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('is invalid')
    end

    it 'is not valid with a duplicate email' do
      user.email = 'test@example.com'

      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('has already been taken')
    end

    it 'is not valid with negative points' do
      user.points = -1

      expect(user).not_to be_valid
      expect(user.errors[:points]).to include('must be greater than or equal to 0')
    end
  end
end
