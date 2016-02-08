FactoryGirl.define do
    sequence :type_name do |n|
        "testtype_#{n}"
    end
    
    factory :type do
        name { generate(:type_name) }
        user

        transient do
            subtypes_count 3
        end

        after(:create) do |type, evaluator|
            create_list(:subtype, evaluator.subtypes_count, type: type, user: type.user)
        end
    end
end
