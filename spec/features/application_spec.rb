require 'rails_helper'
require 'spec_helper'

describe 'Application', type: :feature, js: true  do
    before(:each) do
        visit '/'
    end

    it 'has Log in' do
        #TO FIX - sign out first
        expect(page).to have_content('Log in')
    end

    it 'has Sign up' do
        expect(page).to have_content('Sign up')
    end
    
    it 'clicking Log in opens lightbox with Log in form' do
        page.find('#log_in').click
        expect(page).to have_selector('.backdrop-active')
        expect(page).to have_selector('.lightbox-active')
        expect(page.find('.lightbox-active')).to have_selector('form#new_user')
    end

    it 'clicking Sign up opens lightbox with Sign up form' do
        page.find('#sign_up').click
        expect(page).to have_selector('.backdrop-active')
        expect(page).to have_selector('.lightbox-active')
        expect(page.find('.lightbox-active')).to have_selector('form#new_user')
    end
end