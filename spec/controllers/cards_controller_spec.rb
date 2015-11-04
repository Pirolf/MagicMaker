require 'rails_helper'
require 'devise'
include ActionDispatch::TestProcess

RSpec.describe CardsController, type: :controller do
	describe 'Creating a card should succeed when' do
		context "user logged in" do
			before(:each) do
				@user = FactoryGirl.create(:user)
				sign_in @user
			end

			it 'card is default setup' do
				card = FactoryGirl.build(:card)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'color is among red green blue black white' do
				card = FactoryGirl.build(:card, color: "Green")
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'attack is an int between [0,99]' do 
				card = FactoryGirl.build(:card, attack: 99)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'attack is a float' do 
				card = FactoryGirl.build(:card, attack: 1.5)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
				expect(card.attack.class).to be Fixnum
				expect(card.attack).to eq(1)
			end

			it 'defense is an int between [0,99]' do
				card = FactoryGirl.build(:card, defense: 99)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'defense is a float' do 
				card = FactoryGirl.build(:card, defense: 2.5)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
				expect(card.defense).to eq(2)
			end

			it 'desc is blank' do 
				card = FactoryGirl.build(:card, desc: "")
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'desc is not too long' do 
				card = FactoryGirl.build(:card, desc: "a" * 128)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'mana cost is an int in [0,9]' do
				card = FactoryGirl.build(:card, mana_none: 9)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
			end

			it 'mana cost is a float' do 
				card = FactoryGirl.build(:card, mana_red: 4.5)
				card = @user.cards.build(card.attributes)
				expect(card.save!).to be true
				expect(card.mana_red).to eq(4)
			end

			#test paperclip upload images
			it 'image has valid image type and is less than 2mb' do 
				image = fixture_file_upload('blue-marble.png', 'image/png')
				card = FactoryGirl.build(:card)
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

			it 'name is nil' do
				card = FactoryGirl.build(:card, name: nil)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:name]).not_to be_nil
			end

			it 'name has invalid characters' do
				card = FactoryGirl.build(:card, :name_invalid)
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
				card = FactoryGirl.build(:card, color: "Purple")
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:color]).not_to be_nil
			end

			it 'attack is not in [0,99]' do
				card = FactoryGirl.build(:card, attack: 100)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:attack]).not_to be_nil
			end

			it 'attack is not a number' do 
				card = FactoryGirl.build(:card, attack: [])
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:attack]).not_to be_nil
			end

			it 'defense is not in [0, 99]' do 
				card = FactoryGirl.build(:card, defense: 100)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:defense]).not_to be_nil
			end

			it 'defense is not a number' do 
				card = FactoryGirl.build(:card, defense: [])
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:defense]).not_to be_nil
			end

			it 'desc length > 1024' do 
				card = FactoryGirl.build(:card, desc: "a" * 1025)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:desc]).not_to be_nil
			end

			it 'mana_cost is not a number' do 
				card = FactoryGirl.build(:card, mana_none: [])
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:mana_none]).not_to be_nil
			end

			it 'mana_cost is not in [0,9]' do 
				card = FactoryGirl.build(:card, mana_none: 10)
				card = @user.cards.build(card.attributes)
				expect(card.save).to be false
				expect(card.errors[:mana_none]).not_to be_nil
			end

			it 'image is over 2mb' do 
				image = fixture_file_upload('oversized_terrain.jpg', 'image/jpeg')
				card = FactoryGirl.build(:card)
				card.image_art = image
				expect(card.save).to be false
				expect(card.errors[:image_art]).not_to be_nil
			end

			it 'file is not an image' do
				file = fixture_file_upload('test.txt', 'text/plain')
				card = FactoryGirl.build(:card)
				card.image_art = file
				expect(card.save).to be false
				expect(card.errors[:image_art]).not_to be_nil
			end
		end
	end
end
