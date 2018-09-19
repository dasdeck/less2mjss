export default {
    tests: {
        mul: {
            less: '@var1:10px;@var2:5;.class{width: @var1 * @var2;}',
            jss: {
                '@env': {
                    var1: '10px',
                    var2: '5'
                },
                '.class': {
                    width: "/call('mul', env('var1'), env('var2'))/"
                }
            }
        }
    }
}