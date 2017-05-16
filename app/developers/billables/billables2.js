$(function(){
    $('#includedContent').load('developers/billables/create-billable.html', function(){
        $(document).ready(function(){
            $('#show_billable_form').on('click', function(){
                showBillableForm();
            })
        })
    })
})

function showBillableForm (){
    $('#divOnTop').fadeIn(500);
}

$(document).ready(function(){
    $('#billablesTable').DataTable();
});


---------------------
$('#show_billable_form').on('click', function(){
        $scope.showBillableForm();
    })

    $scope.showBillableForm = function (){
        $('#divOnTop').fadeIn(500);
    }

    $(function(){
        $('#includedContent').load('developers/billables/create-billable.html')
    })

    $(document).ready(function(){
        $('#billablesTable').DataTable();
    });