module TypesHelper
    def name_or_nil type
        return nil if type == nil
        return type.name
    end
end
