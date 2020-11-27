"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMatchCdkSnapshot = void 0;
const assert_1 = require("@aws-cdk/assert");
const jest_snapshot_1 = require("jest-snapshot");
const jsYaml = __importStar(require("js-yaml"));
const currentVersionRegex = /^(.+CurrentVersion[0-9A-F]{8})[0-9a-f]{32}$/;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.toMatchCdkSnapshot = function (received, options = {}) {
    const matcher = jest_snapshot_1.toMatchSnapshot.bind(this);
    const { propertyMatchers, ...convertOptions } = options;
    const stack = convertStack(received, convertOptions);
    return propertyMatchers ? matcher(stack, propertyMatchers) : matcher(stack);
};
const convertStack = (stack, options = {}) => {
    const { yaml, ignoreAssets = false, ignoreCurrentVersion = false, subsetResourceTypes, subsetResourceKeys, ...synthOptions } = options;
    const template = assert_1.SynthUtils.toCloudFormation(stack, synthOptions);
    if (ignoreAssets && template.Parameters && template.Resources) {
        template.Parameters = expect.any(Object);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.values(template.Resources).forEach((resource) => {
            var _a;
            if ((_a = resource === null || resource === void 0 ? void 0 : resource.Properties) === null || _a === void 0 ? void 0 : _a.Code) {
                resource.Properties.Code = expect.any(Object);
            }
        });
    }
    if (ignoreCurrentVersion && template.Parameters && template.Resources) {
        template.Parameters = expect.any(Object);
        for (const [key, resource] of Object.entries(template.Resources)) {
            const match = currentVersionRegex.exec(key);
            if (match) {
                const newKey = `${match[1]}xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
                template.Resources[newKey] = resource;
                delete template.Resources[key];
            }
        }
    }
    if (subsetResourceTypes && template.Resources) {
        for (const [key, resource] of Object.entries(template.Resources)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!subsetResourceTypes.includes(resource.Type)) {
                delete template.Resources[key];
            }
        }
    }
    if (subsetResourceKeys && template.Resources) {
        for (const [key] of Object.entries(template.Resources)) {
            if (!subsetResourceKeys.includes(key)) {
                delete template.Resources[key];
            }
        }
    }
    return yaml ? jsYaml.safeDump(template) : template;
};
if (expect !== undefined) {
    expect.extend({ toMatchCdkSnapshot: exports.toMatchCdkSnapshot });
}
else {
    console.error("Unable to find Jest's global expect." +
        "\nPlease check you have added jest-cdk-snapshot correctly." +
        "\nSee https://github.com/hupe1980/jest-cdk-snapshot for help.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE2QztBQUU3QyxpREFBZ0Q7QUFDaEQsZ0RBQWtDO0FBV2xDLE1BQU0sbUJBQW1CLEdBQUcsNkNBQTZDLENBQUM7QUErQjFFLDZFQUE2RTtBQUNoRSxRQUFBLGtCQUFrQixHQUFHLFVBR2hDLFFBQWUsRUFDZixVQUFtQixFQUFFO0lBRXJCLE1BQU0sT0FBTyxHQUFHLCtCQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLGNBQWMsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUV4RCxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBRXJELE9BQU8sZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlFLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBWSxFQUFFLFVBQW1CLEVBQUUsRUFBRSxFQUFFO0lBQzNELE1BQU0sRUFDSixJQUFJLEVBQ0osWUFBWSxHQUFHLEtBQUssRUFDcEIsb0JBQW9CLEdBQUcsS0FBSyxFQUM1QixtQkFBbUIsRUFDbkIsa0JBQWtCLEVBQ2xCLEdBQUcsWUFBWSxFQUNoQixHQUFHLE9BQU8sQ0FBQztJQUVaLE1BQU0sUUFBUSxHQUFHLG1CQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRWxFLElBQUksWUFBWSxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUM3RCxRQUFRLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekMsOERBQThEO1FBQzlELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWEsRUFBRSxFQUFFOztZQUMxRCxVQUFJLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxVQUFVLDBDQUFFLElBQUksRUFBRTtnQkFDOUIsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQztRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLG9CQUFvQixJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTtRQUNyRSxRQUFRLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ2hFLE1BQU0sS0FBSyxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QyxJQUFJLEtBQUssRUFBRTtnQkFDVCxNQUFNLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsa0NBQWtDLENBQUM7Z0JBQzdELFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDO2dCQUN0QyxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRjtLQUNGO0lBRUQsSUFBSSxtQkFBbUIsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQzdDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNoRSw4REFBOEQ7WUFDOUQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBRSxRQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6RCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7U0FDRjtLQUNGO0lBRUQsSUFBSSxrQkFBa0IsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQzVDLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztTQUNGO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQUVGLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtJQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsa0JBQWtCLEVBQWxCLDBCQUFrQixFQUFFLENBQUMsQ0FBQztDQUN2QztLQUFNO0lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FDWCxzQ0FBc0M7UUFDcEMsNERBQTREO1FBQzVELCtEQUErRCxDQUNsRSxDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTeW50aFV0aWxzIH0gZnJvbSBcIkBhd3MtY2RrL2Fzc2VydFwiO1xuaW1wb3J0IHsgU3RhY2ssIFN5bnRoZXNpc09wdGlvbnMgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IHsgdG9NYXRjaFNuYXBzaG90IH0gZnJvbSBcImplc3Qtc25hcHNob3RcIjtcbmltcG9ydCAqIGFzIGpzWWFtbCBmcm9tIFwianMteWFtbFwiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXG4gIG5hbWVzcGFjZSBqZXN0IHtcbiAgICBpbnRlcmZhY2UgTWF0Y2hlcnM8Uj4ge1xuICAgICAgdG9NYXRjaENka1NuYXBzaG90KG9wdGlvbnM/OiBPcHRpb25zKTogUjtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY3VycmVudFZlcnNpb25SZWdleCA9IC9eKC4rQ3VycmVudFZlcnNpb25bMC05QS1GXXs4fSlbMC05YS1mXXszMn0kLztcblxudHlwZSBPcHRpb25zID0gU3ludGhlc2lzT3B0aW9ucyAmIHtcbiAgLyoqXG4gICAqIE91dHB1dCBzbmFwc2hvdHMgaW4gWUFNTCAoaW5zdGVhZCBvZiBKU09OKVxuICAgKi9cbiAgeWFtbD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElnbm9yZSBBc3NldHNcbiAgICovXG4gIGlnbm9yZUFzc2V0cz86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIElnbm9yZSBMYW1iZGEgQ3VycmVudCBWZXJzaW9uXG4gICAqL1xuICBpZ25vcmVDdXJyZW50VmVyc2lvbj86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE1hdGNoIG9ubHkgcmVzb3VyY2VzIG9mIGdpdmVuIHR5cGVzXG4gICAqL1xuICBzdWJzZXRSZXNvdXJjZVR5cGVzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIE1hdGNoIG9ubHkgcmVzb3VyY2VzIG9mIGdpdmVuIGtleXNcbiAgICovXG4gIHN1YnNldFJlc291cmNlS2V5cz86IHN0cmluZ1tdO1xuXG4gIHByb3BlcnR5TWF0Y2hlcnM/OiB7IFtwcm9wZXJ0eTogc3RyaW5nXTogdW5rbm93biB9O1xufTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbmV4cG9ydCBjb25zdCB0b01hdGNoQ2RrU25hcHNob3QgPSBmdW5jdGlvbiAoXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gIHRoaXM6IGFueSxcbiAgcmVjZWl2ZWQ6IFN0YWNrLFxuICBvcHRpb25zOiBPcHRpb25zID0ge31cbikge1xuICBjb25zdCBtYXRjaGVyID0gdG9NYXRjaFNuYXBzaG90LmJpbmQodGhpcyk7XG4gIGNvbnN0IHsgcHJvcGVydHlNYXRjaGVycywgLi4uY29udmVydE9wdGlvbnMgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3Qgc3RhY2sgPSBjb252ZXJ0U3RhY2socmVjZWl2ZWQsIGNvbnZlcnRPcHRpb25zKTtcblxuICByZXR1cm4gcHJvcGVydHlNYXRjaGVycyA/IG1hdGNoZXIoc3RhY2ssIHByb3BlcnR5TWF0Y2hlcnMpIDogbWF0Y2hlcihzdGFjayk7XG59O1xuXG5jb25zdCBjb252ZXJ0U3RhY2sgPSAoc3RhY2s6IFN0YWNrLCBvcHRpb25zOiBPcHRpb25zID0ge30pID0+IHtcbiAgY29uc3Qge1xuICAgIHlhbWwsXG4gICAgaWdub3JlQXNzZXRzID0gZmFsc2UsXG4gICAgaWdub3JlQ3VycmVudFZlcnNpb24gPSBmYWxzZSxcbiAgICBzdWJzZXRSZXNvdXJjZVR5cGVzLFxuICAgIHN1YnNldFJlc291cmNlS2V5cyxcbiAgICAuLi5zeW50aE9wdGlvbnNcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgdGVtcGxhdGUgPSBTeW50aFV0aWxzLnRvQ2xvdWRGb3JtYXRpb24oc3RhY2ssIHN5bnRoT3B0aW9ucyk7XG5cbiAgaWYgKGlnbm9yZUFzc2V0cyAmJiB0ZW1wbGF0ZS5QYXJhbWV0ZXJzICYmIHRlbXBsYXRlLlJlc291cmNlcykge1xuICAgIHRlbXBsYXRlLlBhcmFtZXRlcnMgPSBleHBlY3QuYW55KE9iamVjdCk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIE9iamVjdC52YWx1ZXModGVtcGxhdGUuUmVzb3VyY2VzKS5mb3JFYWNoKChyZXNvdXJjZTogYW55KSA9PiB7XG4gICAgICBpZiAocmVzb3VyY2U/LlByb3BlcnRpZXM/LkNvZGUpIHtcbiAgICAgICAgcmVzb3VyY2UuUHJvcGVydGllcy5Db2RlID0gZXhwZWN0LmFueShPYmplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGlnbm9yZUN1cnJlbnRWZXJzaW9uICYmIHRlbXBsYXRlLlBhcmFtZXRlcnMgJiYgdGVtcGxhdGUuUmVzb3VyY2VzKSB7XG4gICAgdGVtcGxhdGUuUGFyYW1ldGVycyA9IGV4cGVjdC5hbnkoT2JqZWN0KTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHJlc291cmNlXSBvZiBPYmplY3QuZW50cmllcyh0ZW1wbGF0ZS5SZXNvdXJjZXMpKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGN1cnJlbnRWZXJzaW9uUmVnZXguZXhlYyhrZXkpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGNvbnN0IG5ld0tleSA9IGAke21hdGNoWzFdfXh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4YDtcbiAgICAgICAgdGVtcGxhdGUuUmVzb3VyY2VzW25ld0tleV0gPSByZXNvdXJjZTtcbiAgICAgICAgZGVsZXRlIHRlbXBsYXRlLlJlc291cmNlc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdWJzZXRSZXNvdXJjZVR5cGVzICYmIHRlbXBsYXRlLlJlc291cmNlcykge1xuICAgIGZvciAoY29uc3QgW2tleSwgcmVzb3VyY2VdIG9mIE9iamVjdC5lbnRyaWVzKHRlbXBsYXRlLlJlc291cmNlcykpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICBpZiAoIXN1YnNldFJlc291cmNlVHlwZXMuaW5jbHVkZXMoKHJlc291cmNlIGFzIGFueSkuVHlwZSkpIHtcbiAgICAgICAgZGVsZXRlIHRlbXBsYXRlLlJlc291cmNlc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdWJzZXRSZXNvdXJjZUtleXMgJiYgdGVtcGxhdGUuUmVzb3VyY2VzKSB7XG4gICAgZm9yIChjb25zdCBba2V5XSBvZiBPYmplY3QuZW50cmllcyh0ZW1wbGF0ZS5SZXNvdXJjZXMpKSB7XG4gICAgICBpZiAoIXN1YnNldFJlc291cmNlS2V5cy5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgIGRlbGV0ZSB0ZW1wbGF0ZS5SZXNvdXJjZXNba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geWFtbCA/IGpzWWFtbC5zYWZlRHVtcCh0ZW1wbGF0ZSkgOiB0ZW1wbGF0ZTtcbn07XG5cbmlmIChleHBlY3QgIT09IHVuZGVmaW5lZCkge1xuICBleHBlY3QuZXh0ZW5kKHsgdG9NYXRjaENka1NuYXBzaG90IH0pO1xufSBlbHNlIHtcbiAgY29uc29sZS5lcnJvcihcbiAgICBcIlVuYWJsZSB0byBmaW5kIEplc3QncyBnbG9iYWwgZXhwZWN0LlwiICtcbiAgICAgIFwiXFxuUGxlYXNlIGNoZWNrIHlvdSBoYXZlIGFkZGVkIGplc3QtY2RrLXNuYXBzaG90IGNvcnJlY3RseS5cIiArXG4gICAgICBcIlxcblNlZSBodHRwczovL2dpdGh1Yi5jb20vaHVwZTE5ODAvamVzdC1jZGstc25hcHNob3QgZm9yIGhlbHAuXCJcbiAgKTtcbn1cbiJdfQ==