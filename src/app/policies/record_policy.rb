class RecordPolicy < ApplicationPolicy
  def index?
    if record.published?
      true
    else
      user.present? && record.user_id == user.id
    end
  end

  def show?
    if record.state.in?(["published", "flagged"])
      true
    else
      update?
    end
  end

  def create?
    user.present? && record.user.try(:[],'id') == user.id
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def like?
    user.present? && !user.record_likes.include?(record.id)
  end

  class Scope < Scope
    def resolve
      scope
    end
  end
end
