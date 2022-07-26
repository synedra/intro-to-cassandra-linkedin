"use strict";
var ParsedConditionType;
(function (ParsedConditionType) {
    ParsedConditionType[ParsedConditionType["always"] = 1] = "always";
    ParsedConditionType[ParsedConditionType["hasFile"] = 2] = "hasFile";
    ParsedConditionType[ParsedConditionType["isLanguage"] = 3] = "isLanguage";
    ParsedConditionType[ParsedConditionType["isRootFolder"] = 4] = "isRootFolder";
})(ParsedConditionType = exports.ParsedConditionType || (exports.ParsedConditionType = {}));
class AmbiguousRuleError extends Error {
}
;
class UnknownRuleError extends Error {
}
;
exports.parseCondition = (rule) => {
    const ruleMatchers = [
        {
            pattern: /^always$/,
            type: ParsedConditionType.always
        },
        {
            pattern: /^hasFile:\s*([^\s]+)\s*/,
            type: ParsedConditionType.hasFile
        },
        {
            pattern: /isLanguage:\s*([^\s]+)\s*/,
            type: ParsedConditionType.isLanguage
        },
        {
            pattern: /isRootFolder:\s*([^\s]+)\s*/,
            type: ParsedConditionType.isRootFolder
        }
    ];
    const matchedRules = ruleMatchers.filter(matcher => rule.match(matcher.pattern));
    if (matchedRules.length > 1) {
        throw new AmbiguousRuleError('Please open an issue. ');
    }
    else if (matchedRules.length === 0) {
        throw new UnknownRuleError(`Unable to parse rule - [${rule}], please make sure you are using a known rule pattern`);
    }
    else {
        const matchedRule = matchedRules[0];
        const [firstMatch, ...tailMatches] = rule.match(matchedRule.pattern);
        return {
            type: matchedRule.type,
            args: tailMatches.map(arg => arg.toString())
        };
    }
    ;
};
//# sourceMappingURL=condition-parser.js.map