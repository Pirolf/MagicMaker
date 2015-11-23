require 'rails_helper'

RSpec.describe "subtypes/index", type: :view do
  before(:each) do
    assign(:subtypes, [
      Subtype.create!(),
      Subtype.create!()
    ])
  end

  it "renders a list of subtypes" do
    render
  end
end
