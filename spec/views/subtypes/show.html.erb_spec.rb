require 'rails_helper'

RSpec.describe "subtypes/show", type: :view do
  before(:each) do
    @subtype = assign(:subtype, Subtype.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
