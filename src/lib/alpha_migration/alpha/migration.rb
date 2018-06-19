module Alpha
  class Migration

    def initialize
      # @alpha_pins = Alpha::Pin.includes(pin_content_entry: {content_entry: :content_type}).references(pin_content_entry: {content_entry: :content_type})
      @logger = Logger.new(File.join(Rails.root, 'log', 'migration.log'))
    end

    def perform!
      
    end

    def self.perform
      self.new.perform!
    end


    # private


    def migrate_users
      user_fields = Alpha::User.columns.collect(&:name) & ::User.columns.collect(&:name)
      @alpha_users = Alpha::User.all

      @alpha_users.each do |user|
        begin
          existing_user = ::User.find_by(email: user.email)
          unless existing_user.present?
            fields = user.attributes.select {|k, v| k.in?(user_fields)}
            u = ::User.new(fields)
            u.save(validate: false)
          end
        rescue => e
          @logger.warn("User #{user.email}: #{e}")
        end

      end
    end

    def migrate_groups
      # todo - don't appear to *be* any groups in use
    end

    def migrate_pins
      # get fields which match on both sides

      Alpha::Pin.joins(content_entry: :content_type).references(content_entry: :content_type).all.each do |pin|
        begin
          migrate_pin(pin)
          migrate_pin_attachment(pin)
        rescue
          next
        end
        
      end
    end

    def migrate_pin(pin)
      record_fields = Alpha::Pin.columns.collect(&:name) & ::Record.columns.collect(&:name)
      data = pin.attributes.select {|k,v| k.in?(record_fields)}
      record = Record.find_by(id: pin.id)
      unless record.present?
        begin
          r = Record.new(data.except("location"))
          r.location = {address: Geocoder.address([r.lat, r.lng])}
          r.state = "published"
          r.save!
        rescue => e
          @logger.warn("Pin #{pin.id} (#{pin.title}): #{e}")
        end
      end
    end

    def migrate_pin_attachment(pin)
      content_entry = pin.content_entry
      content_type = content_entry.content_type
      record = Record.find_by(id: pin.id)
      unless record.attachments.any?
        begin
          Record.transaction do
            # alpha only allowed one attachment per pin, so we can safely assume that if the record has an attachment, we can skip it.
            attachment_type = case content_type.name
                                when 'text'
                                  'document'
                                when 'audio'
                                  'audio_file'
                                else
                                  content_type.name
                              end

            # create new attachment of the correct type
            attachment = record.attachments.build(attachment_type: attachment_type, attachable_attributes: {
              title: record.title,
              caption: content_entry.content
            })
            # attachment.attachable.primary = true if attachment_type == "image"
            if content_entry.attached_file.present?
              # we need to move the file across
              attachment.attachable.file.attach(io: StringIO.new(content_entry.attached_file.file.read), filename: content_entry.file_name)
            elsif content_entry.video_url.present?
              attachment.attachable.youtube_id = YoutubeID.from(content_entry.video_url)
            end

            record.save!
            record.update_attribute(:primary_image_id, attachment.attachable.id) if attachment_type == "image"

          end
        rescue => e
          @logger.warn("Pin attachment #{content_entry.id} (#{pin.title}): #{e}")

        end
      end
    end

    def migrate_collections
      Alpha::Collection.all.each do |collection|
        ::Collection.create(
                      title: collection.name,
                      description: collection.description,
                      created_at: collection.created_at,
                      updated_at: collection.updated_at
        )
      #   todo migrate pins
      end
    end


    def log_backtrace(e)
      e.backtrace.each do |l|
        Rails.logger.debug(l)
      end
      e
    end








  end
end