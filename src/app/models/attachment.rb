class Attachment < ApplicationRecord
  belongs_to :attachable, polymorphic: true
  attr_writer :attachment_type
  # TODO: not sure whether url and file methods should be included in attachable, for instance
  # when deleting an url, gives the error: undefined method `file' for <Attachment ..
  delegate :title, :caption, :credit, :url, :file, to: :attachable
  accepts_nested_attributes_for :attachable

  def build_attachable(params)
    self.attachable = "Attachments::#{@attachment_type.classify}".constantize.new(params)
  end

  def has_file?
    attachable.respond_to?(:file)
  end

  def has_url?
    attachable.respond_to?(:url)
  end
end





