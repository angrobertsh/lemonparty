class AddHideToLemons < ActiveRecord::Migration[5.2]
  def change
    add_column :lemons, :hide, :boolean, default: false
  end
end
