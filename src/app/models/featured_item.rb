# A simple model to feature Records and Collections on the marketing site
class FeaturedItem < ApplicationRecord
  belongs_to :item, polymorphic: true

  validates_presence_of :item_id

end


