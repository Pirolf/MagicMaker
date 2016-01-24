require 'spec_helper'
include Warden::Test::Helpers

describe 'types', type: :feature, js: true do
    before(:each) do
        #create a card
        @user_with_card = FactoryGirl.create(:user_with_card)
        login_as @user_with_card, scope: :user
        visit '/'
    end

    xit 'update type' do
        find('#add_types').click
        within('form.edit_type:first') do
            fill_in 'type[name]', with: "type_#{Time.now.to_i}"
            click_button 'Update'
        end
        expect(page).to have_selector('div.success-msg')
    end
end