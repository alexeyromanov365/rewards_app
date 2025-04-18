require 'rails_helper'

RSpec.describe Api::V1::RewardsController, type: :controller do
  describe 'GET #index' do
    let!(:available_reward) { create(:reward, available: true) }
    let!(:unavailable_reward) { create(:reward, available: false) }

    before { get :index, format: :json }

    it 'returns http success' do
      expect(response).to have_http_status(:success)
    end

    it 'returns response in json format' do
      expect(response.content_type).to eq('application/json; charset=utf-8')
    end

    it 'returns only available rewards' do
      json_response = JSON.parse(response.body)

      expect(json_response).to be_an(Array)
      expect(json_response.size).to eq(1)
      expect(json_response.first['id']).to eq(available_reward.id)
    end
  end

  describe 'GET #show' do
    let!(:reward) { create(:reward) }

    context 'when reward exists' do
      before { get :show, params: { id: reward.id }, format: :json }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns the reward' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['id']).to eq(reward.id)
      end
    end

    context 'when reward does not exist' do
      before { get :show, params: { id: 0 }, format: :json }

      it 'returns http not found' do
        expect(response).to have_http_status(:not_found)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns error message' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['error']).to eq('Reward not found')
      end
    end
  end
end 
