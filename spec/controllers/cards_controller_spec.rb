require 'rails_helper'
require 'devise'
include ActionDispatch::TestProcess

RSpec.describe CardsController, type: :controller do
	before :each do 
		#Set up user
		timestamp = Time.now.to_i
		@card_params = { name: "testcards#{timestamp}", color: "Red" }
		@basic_card = Card.new({name: 'nyo', color: 'White'})
	end

	describe 'Creating a card should succeed when' do
		context "user logged in" do
			before(:each) do
				@user = FactoryGirl.create(:user)
				sign_in @user
			end

			it 'card is default setup' do
				card = FactoryGirl.build(:card, :with_name)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'color is among red green blue black white' do
				card = FactoryGirl.build(:card, :with_name, :with_color)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'attack is an int between [0,99]' do 
				card = FactoryGirl.build(:card, :with_name, :with_attack)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'defense is an int between [0,99]' do
				card = FactoryGirl.build(:card, :with_name, :with_defense)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'desc is blank' do 
				card = FactoryGirl.build(:card, :with_name, :without_desc)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'desc is not too long' do 
				card = FactoryGirl.build(:card, :with_name, :with_desc)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'mana cost is an int in [0,99]' do
				card = FactoryGirl.build(:card, :with_name, :with_mana_red)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			#test paperclip upload images
			it 'image has valid image type and is less than 2mb' do 
				image = fixture_file_upload('blue-marble.png', 'image/png')
				card = FactoryGirl.build(:card, :with_name)
				card.attributes[:image_art] = image
				card = @user.cards.build(card.attributes)
				expect(card.save).to be true
			end
		end
	end

	describe 'Creating a card should fail when' do
		context "user logged in" do
			before(:each) do
				@user = FactoryGirl.create(:user)
				sign_in @user
			end

			it 'name does not exist' do
				card = FactoryGirl.build(:card, :without_name)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:name]).not_to be_nil
			end

			it 'name is too long' do
				card = FactoryGirl.build(:card, :with_name_too_long)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:name]).not_to be_nil
			end

			it 'color is not among red green blue black white' do
				card = FactoryGirl.build(:card, :with_name, :with_invalid_color)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(@basic_card.errors[:color]).not_to be_nil
			end

			it 'attack is not in [0,99]' do 
				@basic_card.attack = 100
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:attack]).not_to be_nil
			end
			
			it 'attack is not an int' do 
				@basic_card.attack = 1.5
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:attack]).not_to be_nil
			end

			it 'defense is not in [0, 99]' do 
				@basic_card.defense = -1
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:defense]).not_to be_nil
			end
			it 'defense is not int' do 
				@basic_card.defense = 2.5
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:defense]).not_to be_nil
			end

			it 'desc is too long' do 
				@basic_card.desc = 'a' * 1025
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:desc]).not_to be_nil
			end
			it 'mana_cost is not an int' do 
				@basic_card.mana_green = 1.5
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:mana_green]).not_to be_nil
			end
			it 'mana_cost is not in [0,99]' do 
				@basic_card.mana_green = 100
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:mana_green]).not_to be_nil
			end
			it 'image is over 2mb' do 
				image = fixture_file_upload('oversized_terrain.jpg', 'image/jpeg')
				@basic_card.image_art = image
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:image_art]).not_to be_nil
			end
			it 'file is not an image' do
				file = fixture_file_upload('test.txt', 'text/plain')
				@basic_card.image_art = file
				expect(@basic_card.save).to eq(false)
				expect(@basic_card.errors[:image_art]).not_to be_nil
			end
		end
	end
end
