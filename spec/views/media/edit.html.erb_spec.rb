require 'spec_helper'

describe "media/edit" do
  before(:each) do
    @medium = assign(:medium, stub_model(Medium,
      :title => "MyString",
      :soundcloud_id => "MyString"
    ))
  end

  it "renders the edit medium form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => media_path(@medium), :method => "post" do
      assert_select "input#medium_title", :name => "medium[title]"
      assert_select "input#medium_soundcloud_id", :name => "medium[soundcloud_id]"
    end
  end
end
