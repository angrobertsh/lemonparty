class AddUrlToLemons < ActiveRecord::Migration[5.2]
  def change
    add_column :lemons, :url, :string    
  end
end
