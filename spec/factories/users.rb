FactoryGirl.define do
    sequence :username do |n|
        "testuser#{n}"
    end
    sequence :email do |n|
        "#{n}@miao.com"
    end

    factory :user do
        username
        email
        password "null123!"
        password_confirmation "null123!"
        confirmed_at Time.now
        
        after(:create) do |user|
            create(:type, user: user)
        end

        factory :user_with_card do
            after(:create) do |user|
                create(:card, user: user)
            end
        end
    end
end