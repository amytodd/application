class OverlayContentEntry < ActiveRecord::Base
  belongs_to :overlay
  belongs_to :content_entry

  validates :overlay, uniqueness: {scope: :content_entry, message: "A content entry can only be associated with one overlay"}
end
