var DMP = require('../../../vendors/google-diff-match-patch-js/diff_match_patch_uncompressed.js')

var IncrementalUpdate = function(){
    var dmmp = new DMP.diff_match_patch()
    var result = dmmp.diff_commonOverlap_('', 'abcd')
    console.log(result)
}

export default IncrementalUpdate