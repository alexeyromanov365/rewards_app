require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe 'GET #show' do
    let!(:user) { create(:user) }

    context 'when user exists' do
      before { get :show, params: { id: user.id }, format: :json }

      it 'returns http success' do
        expect(response).to have_http_status(:success)
      end

      it 'returns response in json format' do
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end

      it 'returns the user' do
        json_response = JSON.parse(response.body)

        expect(json_response).to be_a(Hash)
        expect(json_response['id']).to eq(user.id)
      end
    end

    context 'when user does not exist' do
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
        expect(json_response['error']).to eq('User not found')
      end
    end
  end
end
